import * as React from "react";

import { Box, Card, CardContent, Chip, Typography } from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";

import { styles } from "./styles";

interface IProps extends WithStyles<typeof styles> {
	title: string;
	amount: number;
	chip: string;
	percentageText: string;
	percentagecolor: string;
}

const StatsComponent: React.FC<IProps> = ({ classes, title, amount, chip, percentageText, percentagecolor }) => {

	return (
		<>
			<Card style={{marginBottom: 32}}>
				<CardContent className={classes.statsContent}>
					<Typography variant="h6" mb={4}>
						{title}
					</Typography>
					<Typography variant="h3" mb={3}>
						<Box fontWeight="fontWeightRegular">{amount}</Box>
					</Typography>
					<Typography
						variant="subtitle1"	
						mb={4}
						percentagecolor={percentagecolor}
					>
						<span style={{ color: percentagecolor }} className={classes.percentage}>{percentageText}</span>
					</Typography>
					<Chip label={chip} className={classes.statsChip} />
				</CardContent>
			</Card>
		</>
	);
}

export const Stats = withStyles(styles)(StatsComponent);
