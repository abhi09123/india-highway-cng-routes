#!/usr/bin/env python3
"""
Simple script to lookup India's National Expressways & Highway CNG corridors.
For live 24/7 pump status and linear milestone maps, visit https://cngbunk.com/routes/
"""

import json
import os
import sys

def load_corridors():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, 'data', 'major_highways_summary.json')
    with open(data_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def find_corridor(query):
    corridors = load_corridors()
    query_lower = query.lower()
    matches = [c for c in corridors if query_lower in c['highway'].lower() or query_lower in c['from'].lower() or query_lower in c['to'].lower()]
    return matches

if __name__ == '__main__':
    # Ensure stdout handles utf-8 on Windows cp1252 terminals
    if sys.stdout.encoding != 'utf-8':
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except AttributeError:
            pass

    query = sys.argv[1] if len(sys.argv) > 1 else 'yamuna'
    results = find_corridor(query)
    
    print(f"\n--- Found {len(results)} Corridor(s) for '{query}' ---")
    for r in results:
        print(f"-> {r['highway']} ({r['from']} -> {r['to']})")
        print(f"   Length: {r['distance_km']} km")
        print(f"   Interactive Milestone Map: {r['interactive_map_url']}\n")
