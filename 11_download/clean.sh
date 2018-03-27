ps aux | grep electron | awk '{print $2}' | xargs kill -9
