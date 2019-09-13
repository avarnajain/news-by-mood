echo 1
source /home/ubuntu/news-by-mood/env/bin/activate
echo 2
source /home/ubuntu/news-by-mood/secrets.sh
echo 3
python3 /home/ubuntu/news-by-mood/news_api_functions.py
echo 4
python3 /home/ubuntu/news-by-mood/tone_api_functions.py
echo Goobeye Forever.