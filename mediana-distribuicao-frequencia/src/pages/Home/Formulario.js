import React from 'react';

import { Form, Container, Row, Col, Button } from "react-bootstrap";

export default function Formulario() {

    const [showResults, setShowResults] = React.useState(false);
    const [mediana, setMediana] = React.useState(0);
    const [limite_inferior, setLI] = React.useState(0);
    const [comprimento, setH] = React.useState(0);
    const [medium_value, setMDV] = React.useState(0);
    const [Fant, setFant] = React.useState(0);
    const [Fmd, setFmd] = React.useState(0);



    async function handleSubmit(event) {
        event.preventDefault();
        let classes_input = event.target.elements.formClasses.value.split(",");
        let fi_input = event.target.elements.formFI.value.split(",");

        for (let i = 0; i < classes_input.length; i++) {
            classes_input[i] = classes_input[i].split("-");
        }

        let fac = [];
        let sum = 0;
        for (let i = 0; i < fi_input.length; i++) {

            sum += parseFloat(fi_input[i]);
            fac.push(sum);
        }
        let valor_medio = fac[fac.length - 1] / 2;
        let classe_mediana = 0;
        for (let i = 0; i < fac.length; i++) {
            if (fac[i] >= valor_medio) {
                classe_mediana = i;
                break;
            }
        }

        setMDV(valor_medio);
        setH(parseFloat(classes_input[classe_mediana][1]) - parseFloat(classes_input[classe_mediana][0]));
        setLI(parseFloat(classes_input[classe_mediana][0]));
        setFant(fac[classe_mediana - 1]);
        setFmd(fi_input[classe_mediana]);

        setMediana(parseFloat(classes_input[classe_mediana][0]) + ((valor_medio - fac[classe_mediana - 1]) / fi_input[classe_mediana]) * (parseFloat(classes_input[classe_mediana][1]) - parseFloat(classes_input[classe_mediana][0])));

        setShowResults(true);
    }

    const Results = () => (
        <div id="results" className="search-results">
            <h4>Mediana: {mediana}</h4>

            <h4>Fórmula: Md = {limite_inferior} + (({medium_value} - {Fant}) / {Fmd}) x {comprimento}</h4>
        </div>
    )

    return (
        <Container className="formulario">
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formClasses">
                            <Form.Label>Classes</Form.Label>
                            <Form.Control type="text" placeholder="Digite os intervalos das classes separados por - e separe com vírgula(,) " />
                            <Form.Text className="text-muted">
                                Para criar 4 classes em intervalos de 10 a partir do 10: 10-20,20-30,30-40,40-50
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formFI">
                            <Form.Label>Frequencia Absoluta (FI)</Form.Label>
                            <Form.Control type="text" placeholder="Digite os valores separados por vírgula " />
                            <Form.Text className="text-muted">
                                Exemplo: 20,30,40,50,80
                            </Form.Text>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Calcular Mediana
                        </Button>
                    </Form>
                </Col>
                <Col>
                    {showResults ? <Results /> : null}
                </Col>
            </Row>

        </Container>
    )
}