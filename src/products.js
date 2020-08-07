import * as React from 'react';
import {
  List,
  Button,
  SimpleForm,
  TextInput,
  Create,
  DateTimeInput,
} from 'react-admin';
import inflection from 'inflection';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { dataProvider } from './App';

const useStyles = makeStyles({
  root: {
    marginTop: '1em',
  },
  media: {
    height: 140,
  },
  card: {
    height: 380,
  },
  pricetxt: {
    width: 220,
  },
  title: {
    width: 250,
    paddingBottom: '0.1em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    alignment: 'center',
  },
  actionSpacer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

const CategoryGrid = (props) => {
  const classes = useStyles(props);
  const { data, ids } = props;
  console.log(props);
  return ids ? (
    <Grid container spacing={2} className={classes.root}>
      {ids.map((id, index) => (
        <Grid key={id} xs={12} md={5} lg={3} xl={2} item>
          <Card className={classes.card}>
            <CardMedia image={data[id].imgURL} className={classes.media} />
            <CardContent className={classes.title}>
              <Typography variant="h5" component="h2" align="center">
                {inflection.humanize(data[id].productName).length > 20
                  ? inflection
                      .humanize(data[id].productName)
                      .substring(0, 20 - 3) + '...'
                  : inflection.humanize(data[id].productName)}
              </Typography>
            </CardContent>
            <CardContent className={classes.title}>
              <Typography component="h2" align="center">
                {inflection.humanize(data[id].currentPrice)}
              </Typography>
            </CardContent>
            <CardActions classes={{ spacing: classes.actionSpacer }}>
              <Button
                label="Bid"
                onClick={() => {
                  dataProvider
                    .update(`products`, {
                      id: data[id].productId,
                      data: {
                        price: parseFloat(
                          document.getElementsByName('priceTxt')[index].value,
                        ),
                      },
                    })
                    .then((response) => console.log(response));
                  alert(document.getElementsByName('priceTxt')[index].value);
                }}
              ></Button>
            </CardActions>
            <SimpleForm>
              <TextInput
                source="title"
                label="Price"
                name="priceTxt"
                className={classes.pricetxt}
              ></TextInput>
            </SimpleForm>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : null;
};

export const ProductList = (props) => (
  <>
    {/* <Button
      label="Create"
      onClick={() => {
        dataProvider
          .create('products', {
            data: {
              productName: 'Test Khai create auction',
              currentPrice: 500000,
              endAt: '2020-09-25 20:00:00',
              description: 'NEW description',
              imgURL: 'http://lorempixel.com/640/480/cats',
            },
          })
          .then((response) => console.log(response));
        alert('Just Create');
      }}
    ></Button> */}
    <List
      {...props}
      sort={{ field: 'name', order: 'ASC' }}
      perPage={20}
      pagination={false}
      component="div"
      actions={false}
    >
      {/* 
    // @ts-ignore */}
      <CategoryGrid />
    </List>
  </>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label="Product Name" source="productName" />
      <TextInput label="Price" source="currentPrice" />
      <TextInput label="Description" source="description" />
      <DateTimeInput source="endAt"></DateTimeInput>
      <TextInput label="Image" source="imgURL" />
    </SimpleForm>
  </Create>
);
