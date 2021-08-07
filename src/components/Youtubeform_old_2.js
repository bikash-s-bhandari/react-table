import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Youtubeform = () => {
     const initialValues = {
          name: '',
          email: '',
          channel: ''
     };

     const onSubmit = (values) => {
          console.log('subimitted', values)

     };

     const validationSchema = Yup.object({
          name: Yup.string().required('Name is required'),
          email: Yup.string().email('Invalid email').required('Email is required'),
          channel: Yup.string().required('Channel is required')


     });


     const formik = useFormik({
          initialValues,
          onSubmit,//values afai pass hunxa
          validationSchema
     })

     //NOTE:   {...formik.getFieldProps('channel')} le  onChange={formik.handleChange},onBlur={formik.handleBlur} value={formik.values.name} lai reduce garxa


     return (
          <div>
               <form onSubmit={formik.handleSubmit}>
                    <Row>
                         <Col>
                              <label htmlFor="name">Name</label>
                              <input
                                   type="text"
                                   name="name"
                                   className="form-control"
                                   {...formik.getFieldProps('name')}

                              />
                              {formik.touched.name && formik.errors.name && <span className="error">{formik.errors.name}</span>}
                         </Col>
                    </Row>
                    <Row>
                         <Col>
                              <label htmlFor="email">Email</label>
                              <input
                                   type="email"
                                   name="email"
                                   className="form-control"
                                   {...formik.getFieldProps('email')}
                              />
                              {formik.touched.email && formik.errors.email && <span className="error">{formik.errors.email}</span>}
                         </Col>
                    </Row>
                    <Row>
                         <Col>

                              <label htmlFor="channel">Channel</label>
                              <input
                                   type="text"
                                   name="channel"
                                   className="form-control"
                                   {...formik.getFieldProps('channel')}

                              />
                              {formik.touched.channel && formik.errors.channel && <span className="error">{formik.errors.channel}</span>}
                         </Col>
                    </Row>
                    <Row>
                         <Col>
                              <button type="submit" className="btn btn-sm btn-primary">Submit</button>
                         </Col>
                    </Row>
               </form>

          </div >
     )
}

export default Youtubeform
