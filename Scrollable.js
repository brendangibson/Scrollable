/**
*
* Component to provide up and down infinite scrolling.
*
* Adds space above and below the table.  The table will be provided with a
* start and end index to display.
*
* Props:
*   height: height of one row in pixels
*   numRecords: number of records in table
*
* Usage:
*   <Scrollable height={50} numRecords={data.length}>
*      <Table data={data} />
*   </Scrollable>	
*/


var Scrollable = React.createClass({

	getInitialState: function () {
		return {
			start: 0,
			end: 20
		};
	},

	onScroll: function () {
		
		var scroll = window.scrollY,
			top = this.getDOMNode().offsetTop,
			distanceAbove = scroll - top,
			numRecords = this.props.numRecords,
		    recordHeight = this.props.height,
		    paddingTop = Math.max(0, distanceAbove),
		    start = Math.floor(paddingTop / recordHeight),
		    innerHeight = window.innerHeight,
		    end = Math.min(numRecords, start + Math.floor(innerHeight / recordHeight)),
		    paddingBottom = Math.max(0, (numRecords - end) * recordHeight);

        this.setState({
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            start: start,
            end: end
        });
	},

	componentDidMount: function () {
        document.addEventListener('scroll', this.onScroll);
	},
		 
	componentWillUnmount: function () {
	    document.removeEventListener('scroll', this.onScroll);
	},
	
	render: function () {
		var style = {
	    		paddingTop: this.state.paddingTop,
		    	paddingBottom: this.state.paddingBottom
			},
			children = React.Children.map(this.props.children, function(item) {
	            return React.addons.cloneWithProps(item, {
                		start: this.state.start,
                		end: this.state.end
            	});
	        }, this);

		return (
				<div style={style} ref='scrollable'>
					{children}
				</div>
		);
	}
});

module.exports = Scrollable;
