import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'
import Footer from '../components/footer'

const pageTitle = "My Profile";

export default () => (
	<div>
		<Head title={pageTitle} cssFiles={ ["profile.css"] }/>
		<div className="app-container">
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<DashboardNav pageTitle={pageTitle}/>
						<Dashboard pageTitle={pageTitle}/>
						<Footer />
					</div>
				</div>
			</div>
		</div>
	</div>
)
