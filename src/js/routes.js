import React                   from 'react';
import { Route, IndexRoute }   from 'react-router';

import {  App,
          Bookmarks,
                             } from './components';
// import Bookmarks               from './components/Bookmarks';
import Community               from './components/Community';
import Dashboard               from './components/Dashboard';
import Home                    from './components/Home';
import Profile                 from './components/Profile';
import Projects                from './components/Projects';
import Quests                  from './components/Quests';
import Signin                  from './components/Signin';
import Signout                 from './components/Signout';
import Signup                  from './components/Signup';
import Unlocks                 from './components/Unlocks';


export default (
  <Route path='/'             component={ App }         >
    <Route path='bookmarks'   component={ Bookmarks }  />
    <Route path='community'   component={ Community }  />
    <Route path='dashboard'   component={ Dashboard }  />
    <Route path='profile'     component={ Profile }    />
    <Route path='projects'    component={ Projects }   />
    <Route path='quests'      component={ Quests }     />
    <Route path='signin'      component={ Signin }     />
    <Route path='signout'     component={ Signout }    />
    <Route path='signup'      component={ Signup }     />
    <Route path='unlocks'     component={ Unlocks }    />
    <IndexRoute               component={ Home }       />
  </Route>
);
