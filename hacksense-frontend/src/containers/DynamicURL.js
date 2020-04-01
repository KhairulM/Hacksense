import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Grid, Container } from '@material-ui/core';

import Authenticated from 'layouts/Authenticated';

const DynamicURL = (props) => {
  const params = props.match.params;
  const query = queryString.parse(props.location.search);

  const [user, setUser] = useState({ data: false, loading: true, error: false });

  // const fetchUserData = (id) => {
  //   try {
  //     setUser({...user, loading: true});
  //     const resposne = getUserData(id);
  //     setUser({...user, data: response.body.data})

  //   } catch(e) {
  //     setUser({...user, error: true});
  //   }
  // }

  // useEffect(() => {
  //   fetchUserData()
  // }, [fetchUserData])

  // console.log(query);
  
  return (
    <Authenticated>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <Link to="/">Test {params.id}</Link>
          </Grid>
          <Grid item xs={3}>
            Test 2 {params.id}
          </Grid>
          <Grid item xs={3}>
            Test 3 
          </Grid>
        </Grid>
      </Container>
    </Authenticated>
  )
};

export default DynamicURL;