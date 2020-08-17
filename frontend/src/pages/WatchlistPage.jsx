import React from "react";
import { connect } from "react-redux";
import { getWatchlist } from "../redux/actions/watchlistAction";
import { useEffect } from "react";
const WatchlistPage = ({ getWatchlist }) => {
  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await getWatchlist();
      console.log(response);
    };
    fetchWatchlist();
  }, []);
  return <div></div>;
};

export default connect(null, { getWatchlist })(WatchlistPage);
