import json
import stanza
from flask import jsonify

from DataAccess.wikiquery import Result


class Disambiguation():
    def __init__(self):
        pass
    
    def checkEntities(self, text):
        pipe = stanza.Pipeline("en", processors="tokenize,ner", package={"ner": ["ontonotes", "UCSY", "WikiNER"]})
        doc = pipe(text)
        entities = []
        for ent in doc.ents:
            entity_dict = {
                "text": ent.text,
                "type": ent.type,
            }
            if(entity_dict["type"] == 'GPE' or entity_dict["type"] == 'PERSON' or entity_dict["type"] == 'LOC'):
                entities.append(entity_dict)

        return json.dumps(entities)

    def convertText(self, text):
        findId = Result()
        entities_json = self.checkEntities(text)
        entities = json.loads(entities_json)
        unique_person_names = set()
        unique_location_names = set()
        entity_dictionary = dict()
        for entity in entities:
            match entity["type"]:
                case "PERSON":
                    unique_person_names.add(entity["text"])                    
                case "LOC":
                    unique_location_names.add(entity["text"])
                case "GPE":
                    unique_location_names.add(entity["text"])
                case "ORG":
                    print("I'm an organization")
                case "LANGUAGE":
                    print("I'm a language")
        entity_person_list = list(unique_person_names)
        entity_location_list = list(unique_location_names)             
        ids_person_entity = [] 
        ids_location_entity = []       
        for name in entity_person_list:
            my_name_check = findId.checkHumanEntity(name)
            ids_person_entity.extend(my_name_check)
        for loc in entity_location_list:
            my_loc_check = findId.checkLocationEntity(loc)
            ids_location_entity.extend(my_loc_check)


        entity_dictionary["PERSON"] = ids_person_entity
        entity_dictionary["LOCATION"] = ids_location_entity


        #print(entity_dictionary)

        return jsonify(list(entity_dictionary.items()))
