import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'

const pageTitle = "My Connections";

export default () => (
	<div>
		<Head title={pageTitle} cssFiles={ ["dashboardNav.css", "connections.css"] }/>
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
