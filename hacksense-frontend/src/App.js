import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { UserProvider } from 'reducers/user';
import Home from 'containers/Home';
import SignUpChoice from 'containers/user/SignUpChoice';
import SignUpAs from 'containers/user/SignUpAs';
import Login from 'containers/user/Login'
import RequestPage from 'containers/admin/Request';
import DynamicURL from 'containers/DynamicURL';
import UserProjectList from 'containers/user/ProjectList';
import UserProjectDetail from 'containers/user/ProjectDetail';
import AdminProjectList from 'containers/admin/ProjectList';
import AdminProjectDetail from 'containers/admin/ProjectDetail';
import AddProject from 'containers/admin/AddProject';
import Cookie from "universal-cookie";

const cookie = new Cookie();


const App = () => {
  const type = cookie.get('type');
  console.log("saaad", type);
  const ProjectListPage = type === 'admin' ? AdminProjectList : UserProjectList;
  const ProjectDetailPage = type === 'admin' ? AdminProjectDetail : UserProjectDetail;

  return (
    <Fragment>
      <Helmet>
        <title>HackSense</title>
      </Helmet>
      <UserProvider>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={ProjectListPage} />
          <Route exact path="/projects/:idProject" component={ProjectDetailPage} />
          <Route exact path="/signup" component={SignUpChoice} />
          <Route exact path="/signup/:type" component={SignUpAs} />
          <Route exact path="/test/:userId" component={DynamicURL} />
          <Route exact path="/admin/requests" component={RequestPage} />
          <Route exact path="/admin/projects" component={AdminProjectDetail} />
          <Route exact path="/admin/projects/add" component={AddProject} />
          <Route exact path="/requests" component={RequestPage} />
          <Route exact path="/login" component={Login} />
        </BrowserRouter>
      </UserProvider>
    </Fragment>
  );
}

export default App;
