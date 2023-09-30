import React from 'react';
import './notification.css'



const Notification = () => {
    return (
        <div>

            <div className="dashboard-notifications">

                <h4>Notifications</h4>

          <div className="dashboard-widget-timeline">

       				<div id="DZ_W_TimeLine02" className="widget-timeline  dlab-scroll style-1 ps ps--active-y p-3">
                                    <ul className="timeline">
                                        <li>
                                            <div className="timeline-badge primary"></div>
                                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                <span>10 minutes ago</span>
                                                <h6 className="mb-0">Youtube, a video-sharing website, goes live <strong className="text-primary">$500</strong>.</h6>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="timeline-badge info">
                                            </div>
                                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                <span>20 minutes ago</span>
                                                <h6 className="mb-0">New order placed <strong className="text-info">#XF-2356.</strong></h6>
												<p className="mb-0">Quisque a consequat ante Sit amet magna at volutapt...</p>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="timeline-badge danger">
                                            </div>
                                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                <span>30 minutes ago</span>
                                                <h6 className="mb-0">john just buy your product <strong className="text-warning">Sell $250</strong></h6>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="timeline-badge success">
                                            </div>
                                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                <span>15 minutes ago</span>
                                                <h6 className="mb-0">StumbleUpon is acquired by eBay. </h6>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="timeline-badge warning">
                                            </div>
                                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                <span>20 minutes ago</span>
                                                <h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="timeline-badge dark">
                                            </div>
                                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                <span>20 minutes ago</span>
                                                <h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
								 
				
                                </div>

      </div>  </div>
    );
}

export default Notification;
