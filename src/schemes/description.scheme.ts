import sequelize from "../database";
import { Sequelize, DataTypes } from "sequelize";

const Description = sequelize.define("description", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    trad_type: {
      type: DataTypes.STRING,
      allowNull: true
      },
    trad_code: {
      type: DataTypes.STRING,
      allowNull: true
      },
    trad_label: {
      type: DataTypes.STRING,
      allowNull: true
      },
    trad_title: {
      type: DataTypes.STRING,
      allowNull: true
      },
    trad_creatAt: {
      type: DataTypes.DATE,
      allowNull: true
      },
    trad_updateAt: {
      type: DataTypes.DATE,
      allowNull: true
      },
    trad_isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: true
      },
    trad_description_standard: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    trad_description_falc: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    trad_description_creatAt: {
      type: DataTypes.DATE,
      allowNull: true
      },
    trad_isValidate: {
      type: DataTypes.BOOLEAN,
      allowNull: true
      },
    trad_description_audio: {
      type: DataTypes.STRING,
      allowNull: true
      },
    description_falc_name: {
      type: DataTypes.STRING,
      allowNull: true
      },
    description_falc: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    description_audio_falc: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    description_certified_falc: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    description_falc_createAt: {
      type: DataTypes.DATE,
      allowNull: true
      },
    description_falc_updateAt: {
      type: DataTypes.DATE,
      allowNull: true
      },
    quiz_question_standard: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_question_falc: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_question_falc_certified: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_response_true_standard: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_response_true_falc: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_response_true_falc_certified: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_explanation_response_true_standard: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    quiz_explanation_response_true_falc: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    quiz_explanation_response_true_falc_certified: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    quiz_response_1_standard: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_response_1_falc: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_response_1_falc_certified: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_explanation_response_1_standard: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    quiz_explanation_response_1_falc: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    quiz_explanation_response_1_falc_certified: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    quiz_response_2_standard: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_response_2_falc: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_response_2_falc_certified: {
      type: DataTypes.STRING,
      allowNull: true
      },
    quiz_explanation_response_2_standard: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    quiz_explanation_response_2_falc: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    quiz_explanation_response_2_falc_certified: {
      type: DataTypes.TEXT,
      allowNull: true
      }
      },
        {
          freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
          timestamps: false // Dont add createdAt and updatedAt in the query
 });

 export default Description;