import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { setFilter } from "../../actions/actions";
import "./visibility-filter-input.scss";

function VisibilityFilterInput({ setFilter, visibilityFilter }) {
  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label className="form-label">Search Movies: </Form.Label>
        <Col className="search-bar-col">
          <Form.Control
            className="search-bar-input"
            onChange={(e) => setFilter(e.target.value)}
            value={visibilityFilter}
            placeholder="Movie Title "
          />
        </Col>
      </Form.Group>
    </Form>
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
