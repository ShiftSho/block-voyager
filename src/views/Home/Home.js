import React, { useEffect } from 'react';
import "./Home.css"
import "../../App.css"


function Home() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.getElementById('eth-chart').appendChild(script);
  
    script.onload = () => {
      new window.TradingView.widget({
        "width": 980,
        "height": 610,
        "symbol": "KRAKEN:ETHUSD",
        "interval": "H",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "eth-chart"
      });
    };
  }, []);


  return (
    <div>
      <div id="eth-chart-container">
      <h1 style={{ color: 'white', textAlign: 'center' }}>Ethereum Price (USD)</h1>
      <div id="eth-chart">
      </div>
      </div>
    </div>
  );
}

export default Home;