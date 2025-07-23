// Datafeed implementation that you will add later
import Datafeed from "./datafeed.js";

window.tvWidget = new TradingView.widget({
  symbol: "BTC/EUR", // Default symbol pair
  interval: "1D", // Default interval
  fullscreen: false, // Displays the chart in the fullscreen mode
  container: "tv_chart_container", // Reference to an attribute of a DOM element
  datafeed: Datafeed,
  library_path: "../charting_library/",
});

// window.tvWidget = new TradingView.widget({
//   symbol: "BTC/EUR", // Default symbol pair
//   interval: "1D", // Default interval
//   fullscreen: false, // Displays the chart in the fullscreen mode
//   container: "tv_chart_container2", // Reference to an attribute of a DOM element
//   datafeed: Datafeed,
//   library_path: "../charting_library/",
// });
