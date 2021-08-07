import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Youtubeform from "./components/Youtubeform";
import { Container, Pagination, Row } from "react-bootstrap";
import FormikContainer from "./components/ResuableComponent/FormikContainer";
import BasicTable from "./components/Table/BasicTable";
import SortingTable from "./components/Table/SortingTable";
import FilteringTable from "./components/Table/FilteringTable";
import PaginationTable from "./components/Table/PaginationTable";
function App() {
  return (
    <Container>
      <Row>
        {/* <Youtubeform /> */}
        {/* <FormikContainer /> */}
        {/* <BasicTable /> */}
        {/* <SortingTable /> */}
        {/* <FilteringTable /> */}
        <PaginationTable />
      </Row>
    </Container>
  );
}

export default App;
