import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'

const pageTitle = "My Connections";

export default () => (
	<div>
		<Head
			cssFiles={[
				"dashboardNav.css", "connections.css", "profileCard.css"
			]}
			title={pageTitle} />
		<div className="app-container">
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<DashboardNav pageTitle={pageTitle}/>
						<Dashboard pageTitle={pageTitle}/>
					</div>
				</div>
			</div>
		</div>
	</div>
)
