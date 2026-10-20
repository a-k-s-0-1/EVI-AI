import asyncio
import httpx
import trafilatura
from typing import List, Dict, Any, Optional
from duckduckgo_search import DDGS

class SearchService:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        }

    async def search(self, query: str, max_results: int = 4) -> List[Dict[str, str]]:
        """Search DuckDuckGo asynchronously for top links."""
        results = []
        try:
            # Run blocking DuckDuckGo in thread executor
            def _ddg_search():
                with DDGS() as ddgs:
                    return list(ddgs.text(query, max_results=max_results))

            raw_results = await asyncio.to_thread(_ddg_search)
            for r in raw_results:
                results.append({
                    "title": r.get("title", "No Title"),
                    "url": r.get("href", ""),
                    "snippet": r.get("body", "")
                })
        except Exception as e:
            print(f"[SearchService] Search failed for '{query}': {e}")
        return results

    async def fetch_page_content(self, url: str, timeout: float = 6.0) -> Optional[str]:
        """Fetch and extract clean readable text from a URL using trafilatura."""
        if not url or not url.startswith("http"):
            return None
        try:
            async with httpx.AsyncClient(timeout=timeout, follow_redirects=True, headers=self.headers) as client:
                resp = await client.get(url)
                if resp.status_code == 200:
                    extracted = trafilatura.extract(resp.text, include_comments=False, include_tables=True)
                    if extracted and len(extracted.strip()) > 100:
                        return extracted[:3000] # Limit to 3000 chars for concise context
                    return resp.text[:1000] # Fallback raw text snippet
        except Exception as e:
            print(f"[SearchService] Fetch failed for {url}: {e}")
        return None

    async def retrieve_sources(self, query: str, max_results: int = 3) -> List[Dict[str, Any]]:
        """Combined search and page extraction."""
        search_hits = await self.search(query, max_results=max_results)
        sources = []

        fetch_tasks = [self.fetch_page_content(hit["url"]) for hit in search_hits]
        contents = await asyncio.gather(*fetch_tasks, return_exceptions=True)

        for hit, content in zip(search_hits, contents):
            page_text = content if isinstance(content, str) and content else hit["snippet"]
            sources.append({
                "url": hit["url"],
                "title": hit["title"],
                "content": page_text,
                "snippet": hit["snippet"]
            })

        return sources

search_service = SearchService()
