/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import * as THREE from "three";
import { MeshText2D, textAlign } from "three-text2d";
import { colors } from "../../constants";
import AnimationRun from "../../animation-run";

const labelGeometry = new THREE.PlaneBufferGeometry(1, 1);

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const randomizePreference = (node, prefs) => {
  const shallowCopy = [...prefs];
  shuffleArray(shallowCopy);
  node.prefs = shallowCopy;
};

export default class StableMatching extends AnimationRun {
  reduceSteps = async command => {
    switch (command.name) {
      case "START_APPLY":
        await this.startApply(command);
        break;
      case "JOB_OPEN":
        await this.jobOpen(command);
        break;
      case "JOB_REJECTED":
        await this.jobRejected(command);
        break;
      case "JOB_ACCEPTED":
        await this.jobAccepted(command);
        break;
      default:
    }
  };

  createDataSet = ({ n }) => {
    const applicants = [];
    for (let i = 0; i < n; i++) {
      applicants.push({ name: `A${i + 1}` });
    }

    const jobs = [];
    for (let i = 0; i < n; i++) {
      jobs.push({ name: `J${i + 1}` });
    }

    applicants.forEach(a => {
      randomizePreference(a, jobs);
    });

    jobs.forEach(job => {
      randomizePreference(job, applicants);
    });

    return {
      jobs,
      applicants
    };
  };

  calculateCameraPosition = ({ n }) => {
    const z = n * (this.LETTER_HEIGHT + this.LETTER_Y_SPACING);
    const y =
      -(1.2 * n * (this.LETTER_HEIGHT + this.LETTER_Y_SPACING)) / 3 - 50;
    return new THREE.Vector3(this.CONTAINER_WIDTH * 1.5, y, z);
  };

  // Animations
  startApply = async ({ applicant }) => {
    applicant.bgMesh.material.color.setHex(colors.blue);
    applicant.textMesh.material.color.setHex(colors.darkblue);
    applicant.prefMesh.visible = true;
    await this.stepWait(3);
  };

  jobCompare = async ({ job, stagedApplicant, color, applicant }) => {
    const dest = new THREE.Vector3(this.ROW_SPACING_X, job.mesh.position.y, 0);
    await this.animateVector3(applicant.mesh.position, dest, this.SPEED * 4);
    await this.stepWait(3);

    job.prefMesh.visible = true;
    await this.stepWait(3);

    const rejectedPrefMesh = this.threeRoot.scene.children[2].getObjectByName(
      `${job.name}:${applicant.name}`
    );
    rejectedPrefMesh.material.color.setHex(colors.blue);

    const acceptedPrefMesh = this.threeRoot.scene.children[2].getObjectByName(
      `${job.name}:${stagedApplicant.name}`
    );
    rejectedPrefMesh.material.color.setHex(color);
    acceptedPrefMesh.material.color.setHex(color);
    await this.bounceBoth(
      applicant.mesh.position,
      stagedApplicant.mesh.position
    );

    await this.stepWait(3);
    job.prefMesh.visible = false;
    rejectedPrefMesh.material.color.setHex(colors.darkblue);
    acceptedPrefMesh.material.color.setHex(colors.darkblue);
  };

  jobRejected = async ({ applicant, job, stagedApplicant }) => {
    const prefContainerMesh = this.threeRoot.scene.children[2].getObjectByName(
      `${applicant.name}:${job.name}`
    );
    prefContainerMesh.material.color.setHex(colors.green);

    await this.jobCompare({
      applicant,
      job,
      stagedApplicant,
      color: colors.darkorange
    });

    const dest = applicant.mesh.position
      .clone()
      .setX(0)
      .setY(this.calculateBoxPosition(applicant.initialPosition));
    await this.animateVector3(applicant.mesh.position, dest);

    await this.stepWait(3);
    prefContainerMesh.material.color.setHex(colors.gray);
    await this.stepWait(5);
  };

  jobOpen = async ({ applicant, job }) => {
    const prefContainerMesh = this.threeRoot.scene.children[2].getObjectByName(
      `${applicant.name}:${job.name}`
    );
    prefContainerMesh.material.color.setHex(colors.green);
    const dest = new THREE.Vector3(
      this.ROW_SPACING_X * 2,
      job.mesh.position.y,
      0
    );
    await this.animateVector3(applicant.mesh.position, dest, this.SPEED * 4);

    await this.stepWait(3);
    applicant.prefMesh.visible = false;
    applicant.textMesh.material.color.setHex(colors.darkorange);
    applicant.bgMesh.material.color.setHex(colors.orange);
    prefContainerMesh.material.color.setHex(colors.gray);
    await this.stepWait(5);
  };

  jobAccepted = async ({ applicant, stagedApplicant, job }) => {
    const prefContainerMesh = this.threeRoot.scene.children[2].getObjectByName(
      `${applicant.name}:${job.name}`
    );
    prefContainerMesh.material.color.setHex(colors.green);

    await this.jobCompare({
      applicant,
      job,
      stagedApplicant,
      color: colors.green
    });

    const stagedDest = stagedApplicant.mesh.position
      .clone()
      .setX(0)
      .setY(this.calculateBoxPosition(stagedApplicant.initialPosition));
    await Promise.all([
      await this.animateVector3(stagedApplicant.mesh.position, stagedDest),
      await this.animateVector3(
        applicant.mesh.position,
        applicant.mesh.position.clone().setX(this.ROW_SPACING_X * 2)
      )
    ]);

    await this.stepWait(3);
    applicant.prefMesh.visible = false;
    applicant.textMesh.material.color.setHex(colors.darkorange);
    applicant.bgMesh.material.color.setHex(colors.orange);
    prefContainerMesh.material.color.setHex(colors.gray);
    await this.stepWait(5);
  };

  // Mesh
  createContainerMesh = () => {
    const container = new THREE.BoxBufferGeometry(
      this.CONTAINER_WIDTH,
      this.LETTER_HEIGHT,
      1
    );
    const containerMat = new THREE.MeshLambertMaterial({
      color: colors.orange
    });
    const containerMesh = new THREE.Mesh(container, containerMat);
    containerMesh.position.y = 18;
    containerMesh.position.x = 22;
    containerMesh.position.z = -5;
    return containerMesh;
  };

  createPrefContainerMesh = prefs => {
    const count = prefs.length;
    const height = (this.LETTER_HEIGHT + this.LETTER_Y_SPACING) * count;
    const container = new THREE.BoxBufferGeometry(
      this.CONTAINER_WIDTH,
      height,
      1
    );
    const containerMat = new THREE.MeshLambertMaterial({ color: colors.blue });
    const containerMesh = new THREE.Mesh(container, containerMat);

    containerMesh.position.y = -1175;
    containerMesh.position.y = -(height / 2 - 50);

    containerMesh.position.x = 22;
    containerMesh.position.z = -5;

    return containerMesh;
  };

  createPrefTextMesh = ({ appName, name, pos }) => {
    const mesh = new MeshText2D(name, {
      align: textAlign.bottomRight,
      font: "55px Arial",
      fillStyle: "#fdfdfd",
      antialias: true
    });

    let yOffset;
    if (window.devicePixelRatio === 2) {
      yOffset = 350;
    } else if (window.devicePixelRatio === 3) {
      yOffset = 285;
    } else {
      yOffset = 350;
    }

    mesh.position.set(60, 0, 0);
    mesh.material.color.setHex(colors.darkorange);
    mesh.position.y = this.calculateBoxPosition(pos) - yOffset;
    mesh.name = `${appName}:${name}`;
    return mesh;
  };

  createPrefList = ({ prefs, name }) => {
    const group = new THREE.Group();
    const containerMesh = this.createPrefContainerMesh(prefs);

    prefs.forEach((j, i) => {
      const mesh = this.createPrefTextMesh({
        appName: name,
        name: j.name,
        pos: i
      });
      group.add(mesh);
    });

    group.add(containerMesh);
    group.position.x = -this.ROW_SPACING_X;
    group.position.z = this.DEFAULT_Z;
    group.visible = false;
    return group;
  };

  createTextMesh = ({ name }) => {
    const mesh = new MeshText2D(name, {
      align: textAlign.bottomLeft,
      font: "55px Arial",
      fillStyle: "#fdfdfd",
      antialias: true
    });

    let yOffset;
    if (window.devicePixelRatio === 2) {
      yOffset = 350;
    } else if (window.devicePixelRatio === 3) {
      yOffset = 285;
    } else {
      yOffset = 350;
    }
    // mesh.position.set(-30, 140, 0);
    mesh.position.set(-30, -yOffset, 0);
    // mesh.position.set(-30, 0, 0);
    // mesh.position.set(-30, 70, 0);
    // mesh.geometry.height = this.LETTER_HEIGHT;
    // mesh.geometry.width = this.CONTAINER_WIDTH;
    // mesh.position.set(0, 0, 0);
    mesh.material.color.setHex(colors.darkorange);
    return mesh;
  };

  createApplicant = ({ initialPosition, name }) => {
    // const textMesh = this.createTextMesh({ name });
    const canvas = this.makeLabelCanvas(32, name);
    const texture = new THREE.CanvasTexture(canvas);

    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const labelMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true
    });

    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.z = 30;

    console.log(label.position);

    label.scale.x = canvas.width * 2;
    label.scale.y = canvas.height * 2;

    // textMesh.position.x = -12;
    const containerMesh = this.createContainerMesh();

    const group = new THREE.Group();
    group.add(label);
    group.add(containerMesh);
    group.position.y = this.calculateBoxPosition(initialPosition);
    group.position.z = this.DEFAULT_Z;

    return group;
  };

  makeLabelCanvas = (size, name) => {
    const borderSize = 2;
    const ctx = document.createElement("canvas").getContext("2d");
    const font = `${size}px bold sans-serif`;
    ctx.font = font;
    // measure how long the name will be
    const doubleBorderSize = borderSize * 2;
    const width = ctx.measureText(name).width + doubleBorderSize;
    const height = size + doubleBorderSize;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    // need to set font again after resizing canvas
    ctx.font = font;
    ctx.textBaseline = "top";

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.fillText(name, borderSize, borderSize);

    return ctx.canvas;
  };

  createJob = ({ initialPosition, job }) => {
    const textMesh = this.createTextMesh({ name: job.name });
    textMesh.position.x = -10;
    const containerMesh = this.createContainerMesh();

    const group = new THREE.Group();
    group.add(textMesh);
    group.add(containerMesh);
    group.position.y = this.calculateBoxPosition(initialPosition);
    group.position.z = this.DEFAULT_Z;
    group.position.x = this.ROW_SPACING_X * 3;
    return group;
  };

  createJobPrefList = ({ prefs, name }) => {
    const group = new THREE.Group();
    const containerMesh = this.createPrefContainerMesh(prefs);

    prefs.forEach((a, i) => {
      const mesh = this.createPrefTextMesh({
        appName: name,
        name: a.name,
        pos: i
      });
      group.add(mesh);
    });

    group.add(containerMesh);
    group.position.x = this.ROW_SPACING_X * 4;
    group.position.z = this.DEFAULT_Z;
    group.visible = false;
    return group;
  };

  calculateBoxPosition = position => {
    return position * (-this.LETTER_HEIGHT - this.LETTER_Y_SPACING);
  };

  // Algorithm
  runAlgorithm = ({ applicants, jobs }) => {
    const availableApplicants = applicants;

    const steps = [];

    jobs.forEach(job => {
      job.rank = {};
      job.prefs.forEach((pref, i) => {
        job.rank[pref.name] = i;
      });
    });

    const applicantMeshes = availableApplicants.map((a, i) => {
      const mesh = this.createApplicant({ initialPosition: i, name: a.name });
      a.mesh = mesh;
      a.initialPosition = i;
      a.textMesh = mesh.children[0];
      a.bgMesh = mesh.children[1];
      return mesh;
    });

    const applicantPreferenceMeshes = availableApplicants.map(a => {
      const mesh = this.createPrefList(a);
      a.prefMesh = mesh;
      return mesh;
    });

    const jobMeshes = jobs.map((job, i) => {
      const mesh = this.createJob({ initialPosition: i, job });
      job.mesh = mesh;
      return mesh;
    });

    const jobPreferenceMeshes = jobs.map(job => {
      const mesh = this.createJobPrefList(job);
      job.prefMesh = mesh;
      return mesh;
    });

    const allMesh = [
      ...applicantMeshes,
      ...applicantPreferenceMeshes,
      ...jobMeshes,
      ...jobPreferenceMeshes
    ];

    const container = new THREE.Object3D();
    allMesh.forEach(m => {
      container.add(m);
    });

    while (availableApplicants.length > 0) {
      const applicant = availableApplicants.shift();
      const job = applicant.prefs.shift();

      steps.push({
        name: "START_APPLY",
        applicant,
        job
      });

      if (job.stagedApplicant === undefined) {
        job.stagedApplicant = applicant;

        steps.push({
          name: "JOB_OPEN",
          applicant,
          job
        });
      } else {
        const { stagedApplicant } = job;
        const stagedApplicantRank = job.rank[stagedApplicant.name];
        const applicantRank = job.rank[applicant.name];
        if (applicantRank < stagedApplicantRank) {
          steps.push({
            name: "JOB_ACCEPTED",
            applicant,
            stagedApplicant,
            job
          });

          availableApplicants.unshift(stagedApplicant);
          job.stagedApplicant = applicant;
        } else {
          steps.push({
            name: "JOB_REJECTED",
            applicant,
            job,
            stagedApplicant
          });
          availableApplicants.unshift(applicant);
        }
      }
    }
    return {
      meshes: [container],
      steps
    };
  };

  runAlgorithmAlt = ({ applicants, jobs }) => {
    // Create Job Preferences Ranking Matrix
    jobs.forEach(job => {
      job.rank = {};
      job.prefs.forEach((pref, i) => {
        job.rank[pref.name] = i;
      });
    });

    while (applicants.length > 0) {
      const applicant = applicants.shift();
      const job = applicant.prefs.shift();

      if (job.stagedApplicant === undefined) {
        job.stagedApplicant = applicant;
      } else {
        const { stagedApplicant } = job;
        const stagedApplicantRank = job.rank[stagedApplicant.name];
        const applicantRank = job.rank[applicant.name];
        if (applicantRank < stagedApplicantRank) {
          applicants.unshift(stagedApplicant);
          job.stagedApplicant = applicant;
        } else {
          applicants.unshift(applicant);
        }
      }
    }
    return jobs;
  };

  code = [
    { step: "", text: "function findStableMatch({ applicants, jobs }) {" },
    { step: "", text: "  // Create Job Preferences Ranking Matrix" },
    { step: "", text: "  jobs.forEach(job => {" },
    { step: "", text: "    job.rank = {};" },
    { step: "", text: "    job.prefs.forEach((pref, i) => {" },
    { step: "", text: "      job.rank[pref.name] = i;" },
    { step: "", text: "    });" },
    { step: "", text: "  });" },
    { step: "", text: "  " },
    {
      step: "",
      text: "  while (applicants.length > 0) { // while any applicant available"
    },
    { step: "", text: "    // start applying" },
    { step: "", text: "    const applicant = applicants.shift();" },
    { step: "", text: "    const job = applicant.prefs.shift();" },
    { step: "", text: "    " },
    {
      step: "JOB_OPEN",
      text: "    if (job.stagedApplicant === undefined) {"
    },
    { step: "JOB_OPEN", text: "      // job was open" },
    { step: "JOB_OPEN", text: "      job.stagedApplicant = applicant;" },
    {
      step: "JOB_ACCEPTED JOB_REJECTED",
      text: "    } else {"
    },
    {
      step: "JOB_ACCEPTED JOB_REJECTED",
      text: "      // job filled, applicants need to be compared"
    },
    {
      step: "",
      text: "      const { stagedApplicant } = job;"
    },
    {
      step: "",
      text: "      const stagedApplicantRank = job.rank[stagedApplicant.name];"
    },
    {
      step: "",
      text: "      const applicantRank = job.rank[applicant.name];"
    },
    {
      step: "JOB_ACCEPTED",
      text: "      if (applicantRank < stagedApplicantRank) {"
    },
    {
      step: "JOB_ACCEPTED",
      text: "        // new applicant accepted"
    },
    {
      step: "JOB_ACCEPTED",
      text: "        applicants.unshift(stagedApplicant);"
    },
    { step: "JOB_ACCEPTED", text: "        job.stagedApplicant = applicant;" },
    { step: "JOB_REJECTED", text: "      } else { // new applicant rejected" },
    { step: "JOB_REJECTED", text: "        applicants.unshift(applicant);" },
    { step: "JOB_REJECTED", text: "      }" },
    { step: "", text: "    }" },
    { step: "", text: "  } " },
    { step: "", text: "  return jobs;" },
    { step: "", text: "};" }
  ];
}
