import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import {Input} from './components/Input';
import {Button} from './components/Button';
import {Balance} from './components/Balance';
import {Section} from './components/Section';
import {Container} from './components/Container';

const compoundInterest = ( deposit, contribution, years, rate ) => {
  let total = deposit;

  for ( let i = 0; i < years; i++) {
    total = (total + contribution) * ( rate + 1)
  }

  return Math.round(total);
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function App() {

  const [balance, setBalance] = useState('');

  const handleSubmit = ({deposit, contribution, years, rate: interest}) => {
    const result = compoundInterest( Number(deposit), Number(contribution), Number(years), Number(interest));
    setBalance(formatter.format(result));
  };

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
          validationSchema={Yup.object({
            deposit: Yup.number().required('Field required').typeError('Should be a Number'),
            contribution: Yup.number().required('Field required').typeError('Should be a Number'),
            years: Yup.number().required('Field required').typeError('Should be a Number'),
            interest: Yup.number().required('Field required').typeError('Should be a Number').min(0).max(1),
          })}
        >
          <Form>
            <Input name="deposit" label="Initial Deposit" />
            <Input name="contribution" label="Annual Contribution" />
            <Input name="years" label="Years" />
            <Input name="interest" label="Interest" />
            <Button type="submit">Calculate</Button>
          </Form>
        </Formik>
        {
          balance !== ''
            ? <Balance>Final balance: {balance}</Balance>
            : null
        }
      </Section>
    </Container>
  );
};

export default App;
