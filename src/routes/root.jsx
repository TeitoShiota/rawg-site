import { Outlet } from "react-router-dom";

// import NavigationBar from '../components/NavigationBar/NavigationBar';


// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faDAndD } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faDAndD)


// import '../styles/baseStyles.scss'

export default function Root() {

    return (
      <>
        {/* <NavigationBar /> */}
        <main>
          <Outlet />
        </main>
      </>
    );
  }