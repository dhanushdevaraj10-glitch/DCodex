import requests
import re
import urllib.parse

url = "https://pin.it/7E26ylhIq"
session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
})
response = session.get(url, allow_redirects=True)
html = response.text
# Sometimes URLs are escaped like https:\/\/v1.pinimg.com\/videos\/...
html_unescaped = html.replace('\\/', '/')

urls = re.findall(r'https?://[^\s"\'<>]+?\.mp4', html_unescaped)
if urls:
    mp4_url = urls[0]
    print("Found MP4:", mp4_url)
    vid_data = session.get(mp4_url).content
    with open("codex-web/public/contact-bg.mp4", "wb") as f:
        f.write(vid_data)
    print("Downloaded to contact-bg.mp4")
else:
    print("No mp4 found in regex")
