// src/components/Courses.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pobieramy kursy z API (Laravel)
    axios
      .get("/api/courses")
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Błąd pobierania danych");
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
        <p className="text-danger">Wystąpił błąd: {error}</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Kursy</h1>
      <Row>
        {courses.map((course) => (
          <Col key={course.id} xs={12} md={6} lg={4} className="mb-4">
            <Card>
              {course.image && (
                <Card.Img variant="top" src={course.image} alt={course.title} />
              )}
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Button variant="primary">Zobacz szczegóły</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Courses;
