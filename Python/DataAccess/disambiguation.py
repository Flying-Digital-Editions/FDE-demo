from flask import jsonify
import json

class Disambiguation():
    def __init__(self):
        pass

    def convertText(self, id):
        with open('./Utils/database.json', 'r') as file:
            data = json.load(file)
        entities = []
        for t in data:
            if t["id"] == id:
                for span in t["spans"]:
                    entity_list = []
                    entity_id = span["predicted_entity"]["wikidata_entity_id"]
                    for item in span["candidate_entities"]:
                        if item[0].startswith("Q"):
                            entity_list.append(item[0])
                    entity_name = span["text"]
                    entity_type = span["coarse_mention_type"]
                    if entity_id is not None and entity_name is not None and entity_type is not None:
                        entities.append({"Name": entity_name, "ID": entity_id, "Type": entity_type, "Candidates": entity_list})
        return entities
