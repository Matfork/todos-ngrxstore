import { createDomain } from 'ngrx-domains';
import { reducer } from './reducer';
import './state';
import './actions';
import './queries';

createDomain('app', reducer);