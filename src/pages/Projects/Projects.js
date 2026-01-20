import { Box, Card, Text, Heading, Link, Flex } from "rebass";
import { Github } from "lucide-react";

const projects = [
    {
        name: "FalconCV",
        repo: "OpenSciML/FalconCV",
        description:
            "Python library to train and deploy segmentation and detection models with high-level APIs built on TensorFlow and Detectron.",
        tech: ["Python", "TensorFlow", "PyTorch"],
    },
    {
        name: "CVStudio",
        repo: "OpenSciML/CvStudio",
        description:
            "Annotation tool for image classification and segmentation with manual and AI-assisted labeling, built with PyQt and PyTorch.",
        tech: ["Python", "Qt", "PyTorch"],
    },
    {
        name: "RLScara",
        repo: "OpenSciML/RLScara",
        description:
            "Reinforcement learning environment for SCARA robots using DDPG for inverse kinematics with a modular, extensible setup.",
        tech: ["Python", "TensorFlow"],
    },
    {
        name: "gprmaxui",
        repo: "OpenSciML/gprmaxui",
        description:
            "GUI and high-level pythonic API built on top of gprMax to create EM simulations. Enables EM wave modeling and result visualization for ground-penetrating radar use cases.",
        tech: ["Python"],
    },
    {
        name: "RiggingJs",
        repo: "haruiz/RiggingJs",
        description:
            "Real-time face mesh tracking and 3D character rigging using React, TensorFlow.js, and Three.js.",
        tech: ["JavaScript", "TensorFlow.js", "React"],
    },
    {
        name: "gemini-live-avatar",
        repo: "haruiz/gemini-live-avatar",
        description:
            "Browser-based avatar system streaming real-time audio/video with Google Gemini Live API for conversational AI experiences.",
        tech: ["JavaScript", "Python"],
    },
    {
        name: "Elegy",
        repo: "poets-ai/elegy",
        description:
            "Neural networks framework in JAX inspired by Keras. Contributed to model utilities and training APIs.",
        tech: ["Python", "JAX", "TensorFlow"],
    },
    {
        name: "COVID19-Xray",
        repo: "haruiz/COVID19-Xray",
        description:
            "Proof-of-concept X-ray COVID-19 classifier using CNNs fine-tuned on open datasets. Intended for research, not clinical use.",
        tech: ["Python", "TensorFlow"],
    },
];

const ProjectCard = ({ name, repo, description }) => (
    <Box
        sx={{
            background: "linear-gradient(135deg, #e5e7eb, #9ca3af)", // Gray gradient border
            p: "2px",
            borderRadius: 8,
            transition: "transform 0.25s ease",
            "&:hover": {
                transform: "scale(1.015)",
            },
        }}
    >
        <Card
            sx={{
                backgroundColor: "background",
                borderRadius: 6,
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
        >
            <Flex alignItems="center" justifyContent="space-between" mb={2}>
                <Heading fontSize={3} color="text">
                    {name}
                </Heading>
                {repo && (
                    <Link
                        href={`https://github.com/${repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "gray", fontSize: 1 }}
                    >
                        <Flex alignItems="center">
                            <Github size={18} style={{ marginRight: "4px" }} />
                            <Text sx={{ fontSize: 1 }}>{repo.split("/")[1]}</Text>
                        </Flex>
                    </Link>
                )}
            </Flex>
            <Text fontSize={1} color="gray">
                {description}
            </Text>
        </Card>
    </Box>
);



export default function OpenSourceProjects() {
    return (
        <Box p={[3, 4]}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: ["1fr", "1fr 1fr"],
                    gap: 4,
                }}
            >
                {projects.map((project) => (
                    <ProjectCard key={project.name} {...project} />
                ))}
            </Box>
        </Box>
    );
}
