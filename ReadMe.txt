 1.
 <input
   type="text"
   name="name"
   className="form-control"
   onChange={formik.handleChange}
   onBlur={formik.handleBlur}
   value={formik.values.name}
 />

 We can replace onChange,onBlur,value with getFieldProps in formik as 
 <input
  type="text"
  name="name"
  className="form-control"
  {...formik.getFieldProps('name')}
/>

2.Formik Components:it is replacement for useFormik hook
a.formik
b.Form
c.Field: get rid of   {...formik.getFieldProps('fieldName')}, it render html input element
<Field
     as="textarea"
     name="comments"
     className="form-control"
/>

<Field name="address" className="form-control">
                                   {
                                        (props) => {
                                             const { field, form, meta } = props;
                                             console.log(props)
                                             return <input id="address" {...field} className="form-control" />// {...field} will take care of  name,value,onChange,onBlur etc

                                        }

                                   }

                              </Field>
d.ErrorMessage 
   <ErrorMessage
     name="comments"
     component={TextError}//red color ma error customize garna
     />


 OR
 <ErrorMessage name="channel">
     {
          (errMsg) => <div className="error">
               {errMsg}
          </div>


     }
</ErrorMessage>

 //in TextError.js
import React from 'react'

const TextError = (props) => {
     return (
          <div className="error">
               {props.children}
          </div>
     )
}

export default TextError


3.Nested Objects
 const initialValues = {
          name: '',
          social: {
               facebook: '',
               twitter: ''
          },
          skills:['']
     };
<Field
type="text"
name="social.facebook"
className="form-control"


/>
<Field
     type="text"
     name="social.twitter"
     className="form-control"


/>

4.Field Array Component


<FieldArray
name="skills">
{
     (fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          const { skills } = values;

          return <div>
               {
                    skills.map((item, index) => (
                         <div key={index}>
                              <Field name={`skills[${index}]`} />
                              {
                                   index > 0 && (<button
                                        type="button"
                                        onClick={() => remove(index)}>-</button>)//remove garda skills array bata index anusar remove hunxa
                              }

                              <button type="button" onClick={() => push('')}>+</button>//since fieldArray ko name "skills" xa so push garda skills arrayma item push hunxa 
                         </div>
                    ))
               }
          </div>


     }
}

</FieldArray>

5.FastField Component:optimize version of Field component, if perticular field is independent of other filed then we can use FastField
->Normal Field component each filed change huda field re-render hunxa but FastField ma re-render hudena
eg.
<Field name="address" className="form-control">
{(props) => {
     console.log("this component re-render on each other filed in change");

}}
</Field>

<FastField name="address" className="form-control">
              {(props) => {
                console.log("this component will not re-render when other field chnage");
 </FastField>


 6.When does formik validation run??
 ->validation error form.errors object ma auxa
 1.formik runs validation after any change event in the form
 2.formik runs validation after any blur event in the form (field ma click garera bahira click garda)
 3.formik runs valition when direct click on submit button

 How to disbled validation run on change event of formik?
  <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}//now form vitra ko field onChange huda validation error audena, form validation hudena
      validateOnBlur={false}//now validation will not run when onBlur(ie filed vitra click garera bahira click garda validate hunna)
    >
 
 7.Field level validation
 let validate only specific filed comments,

  const validateComments = (value) => {
    let error;
    if (!value) {
      error = "Comment field is required";
    }
    return error;
  };
<Field
as="textarea"
name="comments"
className="form-control"
validate={validateComments}//this will validate the comments filed
/>
<ErrorMessage name="comments" component={TextError} />

8.Manually Trigger validation
->To be able to Trigger validation manually, formik provides two helper methods,we need to use render props pattern in entire form
ie.     
<Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
     
    >
      {(formik) => {
           console.log('formik object',formik)
        return (
          <Form>
          </Form>
        )
      }
      </Formik>

For manual validation:
 <button
                  type="button"
                  onClick={() => formik.validateField("comments")}//comments is the field name for which we want to validate
                >
                  Validate Comments
                </button>
                <button type="button" onClick={() => formik.validateForm()}>
                  Validate All
                </button>
                <button
                  type="button"
                  onClick={() => formik.setFieldTouched("comments")}
                >
                  Visit Comments
                </button>
                <button
                  type="button"
                  onClick={() =>
                    formik.setTouched({
                      name: true,
                      email: true,
                      channel: true,
                    })
                  }
                >
                  Visit Fields
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  Submit
                </button>

 NOTE:Validate Comments button click garera matra vaidation error audena becoz formik object ma touched vanne empty hunxa,so we have to trigger setTouched method
 1.First ma validate comments button click garne
 2.Second ma Visit comments buttn click garne, and this will show error on comments filed
similary for trigger error in all other field first click on   Validate All button and then Visit Fields button
formik.setTouched({
name: true,//field name which we want to validate true
email: true,
channel: true,
})

<button
type="button"
onClick={() => {
formik.validateField("comments");
formik.setFieldTouched("comments");
}}
>
Validate Comments
</button>
<button
type="button"
onClick={() => {
formik.validateForm();
formik.setTouched({
     name: true,
     email: true,
     channel: true,
});
}}
>
Validate All
</button>

9.Disabling Submit Button
->Two scanario 
a.Validity of form state  
b.Form submission in progress

a.First Scanirio
<button
type="submit"
className="btn btn-sm btn-primary"
disabled={!formik.isValid} Or  disabled={(!formik.dirty && formik.isValid)}
>
Submit
</button>

  <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount//button click nagari auto validate garxa yesle and button disable garxa, isValid=false hunxa suru mai
    
    >

b.Disable when submit is in progress (isSubmiting):Form data api ma submit huda button disable garne
  const onSubmit = (values, onSubmitProps) => {

       axios.post().then(data=>{
            onSubmitProps.setSubmitting(false);

       }).catch(err=>{
            onSubmitProps.setSubmitting(false);

       })
   

    
    
  };

<button
type="submit"
className="btn btn-sm btn-primary"
disabled={!formik.isValid || formik.isSubmiting}
>
Submit
</button>


10.Reset Form
 const onSubmit = (values, onSubmitProps) => {

       axios.post().then(data=>{
            onSubmitProps.setSubmitting(false);
              onSubmitProps.resetForm();


       }).catch(err=>{
            onSubmitProps.setSubmitting(false);
             onSubmitProps.resetForm();

       })
   

    
    
  };