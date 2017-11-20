if [ $1 ]; then
	port=$1
else
	port="8000"
fi
	
php -S localhost:"$port" -t ./example/
