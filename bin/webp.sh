ls public/images/* | grep -E 'png$' | sed 's/\.png$//' | xargs -I@ cwebp @.png -o @.webp
ls public/images/* | grep -E 'jpg$' | sed 's/\.jpg$//' | xargs -I@ cwebp @.jpg -o @.webp
ls public/images/* | grep -E 'jpeg$' | sed 's/\.jpeg$//' | xargs -I@ cwebp @.jpeg -o @.webp
