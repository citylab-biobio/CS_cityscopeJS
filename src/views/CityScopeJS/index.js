import { useState, useEffect } from "react";
import CityIO from "./CityIO";
import CityIOviewer from "../CityIOviewer";
// import LoadingSpinner from './CityIO/LoadingSpinner'
import CSjsMain from "./CSjsMain";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useSelector } from "react-redux";

export default function CityScopeJS() {
  // get the table name for cityIO comp
  const [tableName, setTableName] = useState("cityscopejs");
  const [isDone, setIsdone] = useState(false);
  // on init, get the adress URL
  // to search for  a table
  useEffect(() => {
    let url = window.location.toString();
    let pre = "cityscope=";
    let cityscopePrjName = url
      .substring(url.indexOf(pre) + pre.length)
      .toLowerCase();

    // check URL for proper CS project link
    if (url.indexOf(pre) !== -1 && cityscopePrjName.length > 0) {
      setTableName(cityscopePrjName);
    } else {
      /** if failed to get table name from
       * url location, go to the
       * CityIO viewer
       *
       */
      setIsdone(true);
    }
  }, []);

  const [loadingModules, setLoadingModules] = useState([]);
  const cityIOdata = useSelector((state) => state.cityIOdata);

  return (
    <>
      <LoadingSpinner loadingModules={loadingModules} />
      {tableName && <CityIO tableName={tableName} />}
      {tableName && <CSjsMain tableName={tableName} />}
      {/* {isDone && <CityIOviewer />} */}
    </>
  );
}
