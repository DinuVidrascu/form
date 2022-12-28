import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup';

const MyTextImput = ({label, ...props})=>{

    const[field, meta] = useField(props)
    return(
        <>
        <label htmlFor={props.name}>{label}</label>
        <input {...props} {...field}/>
        {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
        ): null}
        </>
    )
}

const MyCheckBox = ({children, ...props})=>{

    const[field, meta] = useField({...props, type:'checkbox'})
    return(
        <>
        <label className="checkbox">
            <input type="checkbox" {...props} {...field}/>
            {children}
        </label>

        {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
        ): null}
        </>
    )
}

const CustomForm = () => {

    return (
        <Formik
        initialValues = {{
            name: '',
            email: '',
            amount: 0,
            currenty: '',
            text: '',
            terms: false
            }}
            validationSchema =  {Yup.object({
                name: Yup.string()
                        .min(2, 'Minimum 2 symbols')
                        .required('Mandatory field!'),
                email: Yup.string()
                          .email('The email address is NOT correct')
                          .required('Mandatory field!'),
                amount: Yup.number()
                           .min(5, 'No less than 5 values')
                           .required('Mandatory field!'),
                currenty: Yup.string()
                             .required('Choose the currency'),
                text: Yup.string()
                          .min(10, 'No less than 10 symbols'),
                terms: Yup.boolean()
                          .required('It is necessary to agree')
                          .oneOf([true], 'It is necessary to agree')
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >

        <Form className="form">
            <h2>SEND DONATION</h2>
            <MyTextImput
                label="Your Name"
                id="name"
                name="name"
                type="text"
            />
            <MyTextImput 
            label="Email"
            id="email"
            name="email"
            type="email"
            />

            <label htmlFor="amount">The amount</label>
            <Field
                id="amount"
                name="amount"
                type="number"
            />
            <ErrorMessage className="error" name="amount" component="div"/>
            
            <label htmlFor="currency">Currency</label>
            <Field
                id="currency"
                name="currency"
                as="select">
                    <option value="">Choose Currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
            </Field>
            <ErrorMessage className="error" name="currency" component="div"/>
            
            <label htmlFor="text">Your message</label>
            <Field 
                id="text"
                name="text"
                as="textarea"
            />
            <ErrorMessage className="error" name="text" component="div"/>
            
            <MyCheckBox 
            name="terms">
                Do you agree with the privacy policy?
            </MyCheckBox>
            <button type="submit">Send</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;