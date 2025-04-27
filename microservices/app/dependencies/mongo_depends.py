from app.config.db_config_mongo import connect_to_db_mongo

def get_mongo():
	return connect_to_db_mongo()