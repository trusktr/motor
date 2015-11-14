
let HierarchyCardTypes = new Mongo.Collection("HierarchyCardTypes");
export default HierarchyCardTypes

/*
  {
    _id:              MongoId
    spaceId:            SpaceId
    name:             String
    fields: {
      'fieldName':    FieldType,
      'fieldName':    FieldType
    }
    parentTypeId:       CardTypeId
    childTypeId:        CardTypeId
    layout:           String
    settings: {
      color:          Hex String
    }
  }
*/


// HierarchyCardTypes Helpers
//
HierarchyCardTypes.helpers({
  'hasField': function(field) {
    var parsedField = field.split(".") || [];
    var fieldExists = true;
    var obj = this.fields || {};

    _.each(parsedField, function(key) {
      if(!obj.hasOwnProperty(key)) {
        fieldExists = false;
      } else {
        obj = obj[key];
      }
    });

    return fieldExists ? true : false;
  },
  'parentType': function () {
    return HierarchyCardTypes.findOne(this.parentTypeId);
  },
  'childType': function () {
    return HierarchyCardTypes.findOne(this.childTypeId);
  }

});

// HierarchyCardTypes methods
//
Meteor.methods({


  // Method to create a new card type
  //
  "HierarchyCardTypes.create": function (opts) {
    if(!opts.spaceId) {
      return;
    }
    // Insert new card type document
    var cardTypeId = HierarchyCardTypes.insert(opts);

    return cardTypeId;
  },

  "HierarchyCardTypes.update.field": function(cardTypeId, field, value) {
    var set = {};
    set[field] = value;
    HierarchyCardTypes.update({"_id": cardTypeId}, {$set: set});
  }


});

if (Meteor.isServer) {
    let DefaultCardTypes = [
      {
        "name": "Stage",
        "color": "#525766",
        "fields": {
          "content": {
            "description": "",
          }
        }
      },
      {
        "name": "Segment",
        "color": "#86899A",
        "fields": {
          "content": {
            "description": "",
          }
        }
      },
      {
        "name": "Situation",
        "color": "#B8BECC",
        "fields": {
          "content": {
            "description": "",
          }
        }
      },
      {
        "name": "Activity",
        "color": "#D9EAD2",
        "fields": {
          "owner": "",
          "content": {
            "description": "",
            "priority": 0,
            "size": ""
          },
          "hours": {
            "rollup": true
          }
        }
      },
      {
        "name": "Action",
        "color": "#C7D8F8",
        "fields": {
          "owner": "",
          "content": {
            "description": "",
            "priority": 0,
            "size": ""
          },
          "hours": {
            "rollup": true
          }
        }
      },
      {
        "name": "Feature",
        "color": "#FEF3C9",
        "fields": {
          "owner": "",
          "content": {
            "description": "",
            "priority": 0,
            "size": "",
            "cycle": "Backlog",
          },
          "hours": {
            "rollup": false
          }
        }
      },
      {
        "name": "Task",
        "color": "#FF0000",
        "fields": {
          "content": {
            "description": "",
            "status": "",
            "role": "",
            "hours": "2"
          }
        }
      },
      {
        "name": "Acceptance",
        "color": "#FF8800",
        "fields": {
          "content": {
            "description": ""
          }
        }
      }
    ]

    let buildDefaultCardTypes = function (spaceId) {
      var cardTypes = {};

      _.each(DefaultCardTypes, function (cardType) {
        //cardType.spaceId = spaceId;
        cardType.spaceId = 1;

        //console.log(' --- calling card type creation method.')

        cardType._id = Meteor.call('HierarchyCardTypes.create', cardType);
        //console.log('     done calling card type creation method.')

        cardTypes[cardType._id] = cardType;
      });

      return cardTypes;
    }


    if (!HierarchyCardTypes.find().fetch().length)
        buildDefaultCardTypes()
}
