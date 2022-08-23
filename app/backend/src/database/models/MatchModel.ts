import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Match.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team',
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team',
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: INTEGER,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false });

Team.belongsTo(Match, { foreignKey: 'id', as: 'teamHome' });
Team.belongsTo(Match, { foreignKey: 'id', as: 'teamAway' });

Match.hasMany(Team, { foreignKey: 'id', as: 'teamHome' });
Match.hasMany(Team, { foreignKey: 'id', as: 'teamAway' });

export default Match;
