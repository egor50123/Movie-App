import React from 'react';
import ReactDOM from "react-dom/client";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//       <BrowserRouter>
//           <Provider store={store}>
//               <App />
//           </Provider>
//       </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BrowserRouter>
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
</BrowserRouter>)

reportWebVitals();
