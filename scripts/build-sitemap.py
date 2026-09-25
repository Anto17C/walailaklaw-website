#!/usr/bin/env python3
"""Rebuild sitemap.xml: every page in every language, hreflang alternates, and <lastmod>.

Usage:  python3 scripts/build-sitemap.py

Pages are discovered from the .html files on disk (English pages at the repo root and in
locations/, with th/, fr/ and zh/ mirrors). Existing sitemap order is kept; new pages are appended.

<lastmod> is the date of the last git commit that changed the page, ignoring site-wide template
commits (a commit touching BULK_COMMIT_FILES or more pages, e.g. a header/footer or language
switcher change) because those are not content changes and would make every page look freshly
updated. A page whose only commit is such a bulk commit (e.g. a newly generated page) uses that
commit's date. Files with uncommitted edits use today's date.
"""
import os, re, subprocess, datetime, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://walailaklaw.com'
BULK_COMMIT_FILES = 300
LOCALES = [('en', '', 'en'), ('th', '/th', 'th'), ('fr', '/fr', 'fr'), ('zh', '/zh', 'zh-Hans')]

def git(*args):
    return subprocess.check_output(['git', '-C', ROOT, *args]).decode('utf-8')

def page_files():
    """English html files relative to ROOT (excludes 404 and the locale mirrors)."""
    out = []
    for base, dirs, files in os.walk(ROOT):
        rel = os.path.relpath(base, ROOT)
        if rel not in ('.', 'locations'):
            dirs[:] = []
            continue
        if rel == '.':
            dirs[:] = [d for d in dirs if d == 'locations']
        for f in files:
            if f.endswith('.html') and f != '404.html':
                out.append(f if rel == '.' else f'{rel}/{f}')
    return out

def en_path(file):
    if file == 'index.html': return '/'
    return '/' + file[:-5]

def file_for(locale_prefix, path):
    if path == '/': name = 'index.html'
    else: name = path[1:] + '.html'
    return (locale_prefix[1:] + '/' if locale_prefix else '') + name

def git_dates():
    """file -> list of (date, files_in_commit), newest first."""
    log = git('log', '--format=@@%ad', '--date=short', '--name-only', '--', '*.html')
    commits, cur = [], None
    for line in log.splitlines():
        if line.startswith('@@'):
            cur = [line[2:], []]; commits.append(cur)
        elif line.strip() and cur is not None:
            cur[1].append(line.strip())
    per_file = collections.defaultdict(list)
    for date, files in commits:
        for f in files:
            per_file[f].append((date, len(files)))
    return per_file

def dirty_files():
    out = git('status', '--porcelain')
    return {l[3:].strip().strip('"') for l in out.splitlines() if l[3:].strip().endswith('.html')}

def main():
    today = datetime.date.today().isoformat()
    dates, dirty = git_dates(), dirty_files()

    def lastmod(f):
        if f in dirty: return today
        hist = dates.get(f, [])
        for d, n in hist:  # newest first
            if n < BULK_COMMIT_FILES: return d
        return hist[0][0] if hist else today

    existing = []
    sm = os.path.join(ROOT, 'sitemap.xml')
    if os.path.exists(sm):
        for loc in re.findall(r'<loc>(.*?)</loc>', open(sm, encoding='utf-8').read()):
            p = loc[len(SITE):]
            if not re.match(r'^/(th|fr|zh)(/|$)', p): existing.append(p)
    found = {en_path(f) for f in page_files()}
    paths = [p for p in existing if p in found] + sorted(found - set(existing))

    blocks = []
    for p in paths:
        alts = ''.join(f'    <xhtml:link rel="alternate" hreflang="{h}" href="{SITE}{pre}{p}" />\n' for _, pre, h in LOCALES)
        for _, pre, _ in LOCALES:
            f = file_for(pre, p)
            if not os.path.exists(os.path.join(ROOT, f)):
                raise SystemExit(f'missing page for sitemap entry: {f}')
            blocks.append(f'  <url>\n    <loc>{SITE}{pre}{p}</loc>\n    <lastmod>{lastmod(f)}</lastmod>\n{alts}  </url>')

    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
           + '\n'.join(blocks) + '\n</urlset>\n')
    open(sm, 'w', encoding='utf-8').write(xml)
    print(f'{len(paths)} pages x {len(LOCALES)} languages = {len(blocks)} URLs written')

if __name__ == '__main__':
    main()
