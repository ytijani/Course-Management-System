// CourseTable.tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CourseTableProps {
  currentItems: {
    id: number;
    title: string;
    instructor: string;
    schedule: string;
  }[];
}

export const CourseTable: React.FC<CourseTableProps> = ({ currentItems }) => {
  return (
    <Table>
      <TableCaption>A list of courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Instructor</TableHead>
          <TableHead>Schedule</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentItems.map((item) => (
          <TableRow key={item.id} className="cursor-pointer">
            <TableCell className="font-medium py-3">{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.instructor}</TableCell>
            <TableCell>{item.schedule}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
