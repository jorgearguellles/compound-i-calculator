import { Formik, Form } from "formik";
import {Input} from './components/Input';
import {Button} from './components/Button';
import {Container} from './components/Container';
import {Section} from './components/Section';

function App() {

  const handleSubmit = () => {
    console.log('Submit clicked')
  }
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            interest: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Input name="deposit" label="Initial Deposit" />
            <Input name="contribution" label="Annual Contribution" />
            <Input name="years" label="Years" />
            <Input name="rate" label="Interest" />
            <Button>Calculate</Button>
          </Form>
        </Formik>
      </Section>
    </Container>
  );
};

export default App;
