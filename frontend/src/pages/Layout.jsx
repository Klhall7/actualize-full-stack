import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Outlet id='outlet' />
             {/* need to add global styling */}
        </>
    );
}

export default Layout