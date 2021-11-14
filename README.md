# CSE332_HW4
**Visualization Dashboard**

This repository is a visualization dashboard for CSE332 - Introduction to Visualization Project 4.

The dataset visualized is a subset of avocado data from this kaggle link: https://www.kaggle.com/neuromusic/avocado-prices
It also has a merged data category which is titled Production, which measures production (in millions) per year.
I chose to implement a parallel coordinate plot (PCP), pie chart, scatter plot, and histogram.

The two selection/linking tools I chose to implement were selecting data points on the PCP, and selection on the pie chart.
Note that the reset button does not reset the selection, and the pie chart selection updates the histogram and scatter plot, while the PCP does not.

**My sample writeup is as follows:**

Design Decisions:
This web application must update the data shown after certain brushing operations, such as selecting a subset of the data, and these state changes are the only required time for updating the view. I decided to code the application similar to how they are coded in CSE316 - with React, a global store, and using Node, as application updates on state changes is React’s forte. Luckily, due to the simplicity of the website, a server was not necessary, and only front-end code was written.
Below is an image of the completed user interface. To tell a story related to the differences between traditional (non-organic) and organic avocados, I decided to have this be one of the selection/linking operations. Selecting either of the two pie slices will reformat the data on all other charts, and change the color of the chart accordingly. This allows us to easily compare the two data subsets, as well as the distribution of the entire dataset.


The reset button simply resets the data selected on the pie chart. The selection of the parallel coordinate plot can be deselected by clicking anywhere on the canvas once.

The parallel coordinate plot has the ability to select data. For increased user functionality, you can select anywhere on the entire plot, as wide or high as you choose, and any attributes on any of the axes that fall in this selection will be highlighted as well as their entire datapoint paths. Simply clicking (and not dragging) will remove the current selection.
There are two main design decisions here that I made. First, since you can simply remove the selection by clicking, I did not link the reset button to the selection of the parallel coordinate plot, although it is linked to the data it shows (just not the selected data). This allows the user to click reset and compare the entire dataset with a specific selection with either organic or non-organic dataset with the same selection. The second design decision was to link the selection of the parallel coordinate plot with the other charts. I chose not to link these charts based on selection, because there is the possibility of confusing the user with selection, and furthermore, it detracts from the story I wish to tell which should always be based on the difference between organic and traditional avocados.

Stories - what you can see in each display:

Story 1:

For our first story, let us take the role of an economist trying to find industry-specific examples to support or disprove the existence of the roles of supply and demand. Perhaps one industry the researcher wishes to cover is food-specific businesses, in our case, suppliers and grocery stores. Using the parallel coordinate plot, the researcher can select the bottom or top half of total volume, and see where the data points seem to lie when the paths reach the average price attribute. However, the researcher can take this further. Selecting the pie chart sections allows us to see (using the histogram) that less resource intensive avocados (i.e. traditional avocados when compared to organic) tend to be cheaper than their more resource intensive alternatives. Viewing the parallel coordinate chart once more, we can see that this decreased price leads to a much higher volume. The researcher may conclude that small changes in product price lead to exponential differences in volume sold, however this conclusion must be further investigated. 

Story 2:
	For our second story, let us take the role of a grocery store manager, looking to optimize profits by any means necessary. We know by looking at the bar chart that the average price of organic avocados is higher than that of traditional avocados, however the volume is so much less that this mediocre price increase does not justify stocking the types equally. So, using this dashboard, the manager may select the upper half of average price avocados on the parallel coordinate plot, with hopes of seeing trends that allow him to improve profitability. He notices that there is a strong correlation with high average price, Xlarge bags, large bags, and 4770, and type 1 (organic) avocados. A choice the manager may make from this data is to keep the larger bag options near the organic PLU 4770 avocado section, so it is convenient for people to purchase this option, as well as putting these options near the front of the store since they are higher price (just as brand name products often choose to their product more at eye level compared to the no name brands so they improve purchase quantity). The manager may search more into this organic avocado change, and see that when comparing the organic and traditional avocado’s on the production vs average price scatter plot, the traditional avocado sales are declining, while the organic avocado sales are staying consistent. Perhaps this is a result of the earth's changing climate, or  perhaps people are becoming more health conscious. The manager may choose to increase the ratio of organic to traditional avocado’s the store stocks for the next season in hopes to more accurately capture the consumer tendency.

Relationships Noticed:

Low small bags on all types: high large, xlarge bags, almost all type 1.
Maybe keep small and Xlarge bags together, near the type 1 (organic) avocados.

Upper half of average price - high 4770, high large bags, high xlarge bags, also average price, unfortunately low volume. Similarly, shows laws of supply and demand.

Traditional avocados on the production chart show decline, but organic is staying constant. Consumers may be becoming more health conscious. However (check volume) this may be showing growth of individual buyers rather than grocery stores, restaurants, etc.
