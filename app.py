#Import libraies 

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template

#set up variables for the api
app = Flask(__name__)
engine = create_engine("sqlite:///database.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)

#set up variables for each table needed
all_star = Base.classes.all_star
appearances = Base.classes.appearances
player = Base.classes.player
salary = Base.classes.salary
team = Base.classes.team

#create a session from Python to the Database
session = Session(engine)

#set up the api

#set up the home page
@app.route("/")
def home():
    #return "The avaliable paths are /api/v1.0/all_star, /api/v1.0/wins, /api/v1.0/ws_wins"
    return render_template("index.html")

#set up all star route
@app.route("/api/v1.0/all_star")
def all_star_query():
    all_star_q = session.query(all_star.player_id, player.name_first, player.name_last, func.count(all_star.player_id), func.avg(salary.salary)).filter(all_star.year >='2001').filter(player.player_id == all_star.player_id).filter(all_star.player_id == salary.player_id).group_by(all_star.player_id).filter(all_star.year == salary.year).all()
    session.close()
    return jsonify(all_star_q)

@app.route("/api/v1.0/wins")
def wins_query():
    wins_q = session.query(team.year, team.name, team.w, func.sum(salary.salary)).filter(team.year >= '2001').filter(team.team_id == salary.team_id).filter(team.year == salary.year).group_by(team.year, team.name).all()
    session.close()
    return jsonify(wins_q)

@app.route("/api/v1.0/ws_wins")
def ws_wins_query():
    ws_q = session.query(team.year, team.name, team.ws_win, func.sum(salary.salary)).filter(team.year >= '2001').filter(team.team_id == salary.team_id).filter(team.year == salary.year).group_by(team.year, team.name).all()
    session.close()
    return jsonify(ws_q)

if __name__ == '__main__':
    app.run(debug=True)