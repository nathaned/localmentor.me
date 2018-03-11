import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Footer from '../components/footer'
import Dashboard from '../components/user/dashboard'

const pageTitle = "Find a Mentor";

export default () => (
	<div>
		<Head title="Dashboard" cssFiles={ ["dashboard.css"] }/>
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
