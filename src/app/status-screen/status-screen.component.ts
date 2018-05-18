import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { ServiceActionsObject } from '../workspace-objects';
import * as  $ from 'jquery';
import { StatusService } from './status.service';

@Component({
  selector: 'app-status-screen',
  templateUrl: './status-screen.component.html',
  styleUrls: ['./status-screen.component.css']
})
export class StatusScreenComponent implements OnInit {
  statusList: any;
  jobOriginList = [];
  jobStatusList = [];
  selectedJobOrigin: any;
  selectedJobStatus: any;
  selectedJD: any;

  constructor(
    private router: Router,
    private workspaceService: WorkspaceServicesService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.getJobOrigins();
    this.getJobStatuses();
    this.getStatusList();
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  getStatusList() {
    this.statusList = [];
    this.statusList = [
      {
        job_id: '3b305afd',
        job_origin: 'DB_PROFILE',
        scheduled_time: 1526328703470,
        started_time: 1526328703470,
        end_time: 1526328704470,
        status: 'SUCCESS',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'SUCCESS',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'SUCCESS',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305afe',
        job_origin: 'DB_PROFILE',
        scheduled_time: 1526328784470,
        started_time: 15261279723478,
        end_time: 1526328704470,
        status: 'FAILED',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305aff',
        job_origin: 'END_TO_END_TOOLKIT',
        scheduled_time: 1526378783478,
        started_time: 1526381252998,
        end_time: 1626499383778,
        status: 'IN_PROGRESS',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'IN_PROGRESS',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305afa',
        job_origin: 'LIVE_ARCHIVAL',
        scheduled_time: 1526378783478,
        started_time: 1526479783478,
        end_time: 1626499733778,
        status: 'SCHEDULED',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'SCHEDULED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305afe',
        job_origin: 'METALYZER',
        scheduled_time: 1526328784470,
        started_time: 15261279723478,
        end_time: 1526328704470,
        status: 'FAILED',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305aff',
        job_origin: 'DB_PROFILE',
        scheduled_time: 1526378783478,
        started_time: 1526381252998,
        end_time: 1626499383778,
        status: 'IN_PROGRESS',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'IN_PROGRESS',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305afa',
        job_origin: 'LIVE_ARCHIVAL',
        scheduled_time: 1526378783478,
        started_time: 1526479783478,
        end_time: 1626499733778,
        status: 'SCHEDULED',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'SCHEDULED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305afe',
        job_origin: 'END_TO_END_TOOLKIT',
        scheduled_time: 1526328784470,
        started_time: 15261279723478,
        end_time: 1526328704470,
        status: 'FAILED',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305aff',
        job_origin: 'END_TO_END_TOOLKIT',
        scheduled_time: 1526378783478,
        started_time: 1526381252998,
        end_time: 1626499383778,
        status: 'IN_PROGRESS',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'IN_PROGRESS',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305afa',
        job_origin: 'METALYZER',
        scheduled_time: 1526378783478,
        started_time: 1526479783478,
        end_time: 1626499733778,
        status: 'SCHEDULED',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'SCHEDULED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305afa',
        job_origin: 'METALYZER',
        scheduled_time: 1526378783478,
        started_time: 1526479783478,
        end_time: 1626499733778,
        status: 'SUCCESS',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'SUCCESS',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305afe',
        job_origin: 'END_TO_END_TOOLKIT',
        scheduled_time: 1526328784470,
        started_time: 15261279723478,
        end_time: 1526328704470,
        status: 'FAILED',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305aff',
        job_origin: 'METALYZER',
        scheduled_time: 1526378783478,
        started_time: 1526381252998,
        end_time: 1626499383778,
        status: 'IN_PROGRESS',
        job_details: {
          attempts: [
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'FAILED',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            },
            {
              job_info: {
                run_time: 0,
                run_attempt: 0,
                status: 'IN_PROGRESS',
                scheduled_time: 1526328703470,
                started_time: 1526328703470,
                end_time: 1526328704470,
              },
              message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
            }
          ],
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          }
        }
      },
      {
        job_id: '3b305afa',
        job_origin: 'DB_PROFILE',
        scheduled_time: 1526378783478,
        started_time: 1526479783478,
        end_time: 1626499733778,
        status: 'SUCCESS',
        job_details: {
          input: {
            user_name: 'root',
            host_ip_address: '127.0.0.1',
            database_server: 'MySQL',
            schema_name: 'user_profiles',
            execution_command: 'Mode Analysis (Background Run)',
            database_name: 'user_profiles',
            inc_schema_mode: 'Yes',
            inc_column_mode: 'Yes',
            inc_spv_mode: 'Yes',
            port_no: 3306
          },
        attempts: [
          {
            job_info: {
              run_time: 0,
              run_attempt: 0,
              status: 'FAILED',
              scheduled_time: 1526328703470,
              started_time: 1526328703470,
              end_time: 1526328704470,
            },
            message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
          },
          {
            job_info: {
              run_time: 0,
              run_attempt: 0,
              status: 'SUCCESS',
              scheduled_time: 1526328703470,
              started_time: 1526328703470,
              end_time: 1526328704470,
            },
            message: ['Metadata Analyst Failed', 'Metadata Analyst Completed']
          }
        ]
      }
      }
    ];
  }

  getJobOrigins() {
    this.statusService.getJobOrigins().subscribe((res) => {
      this.jobOriginList = res;
      console.log(res);
    });
  }
  getJobStatuses() {
    this.statusService.getJobStatuses().subscribe((res) => {
      this.jobStatusList = res;
      console.log(res);
    });
  }
  // filter for services
  selectJobOrigin(selectedItem) {
    this.selectedJobOrigin = selectedItem;
  }
  // filter for job status
  selectJobStatus(selectedItem) {
    this.selectedJobStatus = selectedItem;
  }
  showStatusInfo(status, jobId, jobDetails) {
    this.selectedJD = jobDetails;
    this.selectedJD.job_id = jobId;
    this.selectedJD.status = status;
    console.log(this.selectedJD);
    // $('[rel="popover"]').popover({
    //   container: 'body',
    //   html: true,
    //   content: function () {
    //     var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
    //     return clone;
    //   }
    // }).click(function (e) {
    //   e.preventDefault();
    // });
  }
}
