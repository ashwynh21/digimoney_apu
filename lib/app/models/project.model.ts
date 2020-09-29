import { Document, Schema } from 'mongoose';

export interface ProjectModel extends Document {
    project_created?: Date;
    project_submitted?: Date;

    project_description: {
        description:string;
        project_location: string;
        economy_sector: string;
        project_existence: string;
        name_of_investor: string;
    };
    project_value: {
        total_inv_value: string;
        funding_status: boolean;
        percentage_of_funding: string;
        project_scope: string;
    };
    expected_jobs: {
        permanent_jobs: number;
        temporal_jobs: number;
    };
    project_timelines: {
        phases: {
            name: string;
            start_date: Date;
            end_date: Date;
        } [];
    };
    opportunities: {
        project_skills: string[];
        local_sourced_inputs: string[];
        external_sourced_inputs: string[];
    };
    key_enablers: {
        name: string;
        stake_holder: string;
    } [];
}

export const ProjectSchema = new Schema<ProjectModel>(
    {
        project_created: Date,
        project_submitted: Date,

        project_description: {
            description: String,
            project_location: String,
            economy_sector: String,
            project_existence: String,
            name_of_investor: String,
        },
        project_value: {
            total_inv_value: String,
            funding_status: Boolean,
            percentage_of_funding: String,
            project_scope: String,
        },
        expected_jobs: {
            permanent_jobs: Number,
            temporal_jobs: Number,
        },
        project_timelines: {
            phases: [{
                name: String,
                start_date: Date,
                end_date: Date,
            }],
        },
        opportunities: {
            project_skills: [String],
            local_sourced_inputs: [String],
            external_sourced_inputs: [String],
        },
        key_enablers: [{
            name: String,
            stake_holder: String,
        }],
    },
    { collection: 'project' },
);
