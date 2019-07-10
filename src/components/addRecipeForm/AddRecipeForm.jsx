import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, FieldArray } from 'formik'
import TextFieldInput from './TextFieldInput'
import SelectInput from './SelectInput'
import MultiSelectInput from './MultiSelectInput'
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  TextField,
  MenuItem,
  Select,
  Checkbox,
  Input,
  ListItemText,
  Button,
  InputLabel,
  FormControl
} from '@material-ui/core'
import Thumb from './Thumb'
import { Debug } from '../util/Debug'
import FileInput from './FileInput'

const AddRecipeForm = ({
  classes,
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  handleReset,
  seasonList,
  timeList,
  categoriesList
}) => {
  return (
    <Form>
      <Container maxWidth={'lg'}>
        <Box mt={3}>
          <Paper className={classes.recipePaper} elevation={10}>
            <Box mb={3}>
              <Typography>What is the Secret Recipe?</Typography>
              <Grid
                container
                spacing={0}
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <Grid item lg={7} />
                <Field
                  name="title"
                  label="Title"
                  className={classes.textField}
                  component={TextFieldInput}
                />
                <Field
                  name="season"
                  label="Season"
                  className={classes.textField}
                  options={seasonList}
                  component={SelectInput}
                />
                <Field
                  name="timeOptions"
                  label="Cook Time"
                  className={classes.textField}
                  options={timeList}
                  component={SelectInput}
                />
                <Field
                  name="cuisineCategories"
                  label="Categories"
                  className={classes.textField}
                  options={categoriesList}
                  component={MultiSelectInput}
                  optionName="categoryName"
                />
                <Grid item />
              </Grid>
            </Box>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <FieldArray name="instructions">
                {({ push, remove }) => (
                  <React.Fragment>
                    {values.instructions &&
                      values.instructions.length > 0 &&
                      values.instructions.map((instruction, index) => (
                        <>
                          <TextField
                            error={
                              errors[`instructions[${index}].instruction`] &&
                              touched[`instructions[${index}].instruction`]
                            }
                            multiline
                            rows="4"
                            placeholder="Enter Instruction Text"
                            name={`instructions[${index}].instruction`}
                            className={classes.textAera}
                            value={values[`instructions[${index}].instruction`]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors[`instructions[${index}].instruction`] &&
                              touched[`instructions[${index}].instruction`] &&
                              errors[`instructions[${index}].instruction`]
                            }
                            margin="normal"
                          />
                          <FileInput
                            name={`instructions[${index}].image`}
                            label="Instruction Photo:"
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                          />
                          <Button name="close" onClick={() => remove(index)}>
                            Delete{' '}
                          </Button>

                          {values.instructions[index].image && (
                            <Thumb file={values.instructions[index].image} />
                          )}
                        </>
                      ))}
                    <Button
                      onClick={() => push({ instruction: '', image: '' })}
                      primary
                    >
                      Add Instruction
                    </Button>
                  </React.Fragment>
                )}
              </FieldArray>
            </Grid>
          </Paper>
        </Box>
        <Debug />
      </Container>
    </Form>
  )
}

export default AddRecipeForm
