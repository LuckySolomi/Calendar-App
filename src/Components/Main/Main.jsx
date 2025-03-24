import { useSelector } from "react-redux";
import DayView from "../DayView/DayView";
import WeekView from "../WeekView/WeekView";

function Main() {
  const viewMode = useSelector((state) => state.mainCalendar.viewMode);
  return <div>{viewMode === "day" ? <DayView /> : <WeekView />}</div>;
}

export default Main;
