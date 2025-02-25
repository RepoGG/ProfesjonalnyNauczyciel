// src/components/Fields.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const Fields = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/fields`)
      .then((response) => {
        setFields(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Błąd podczas pobierania danych");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Ładowanie...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1>Kierunki kształcenia</h1>
      <Row>
        {fields.map((field) => (
          <Col key={field.id} xs={12} md={4} className="mb-4">
            <Card>
              {field.image && (
                <Card.Img variant="top" src={field.image} alt={field.name} />
              )}
              <Card.Body>
                <Card.Title>{field.name}</Card.Title>
                <Card.Text>{field.description}</Card.Text>
                <Button variant="primary">Pokaż kursy</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Fields;
