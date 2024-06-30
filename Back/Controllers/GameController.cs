﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        [HttpPut]
        [Route("ProcessData")]
        public IActionResult ProcessData([FromBody] PlateauData data)
        {
            List<List<Point>> points = new List<List<Point>>();

            points.Add(GenerateRandomPointsList(5));
            points.Add(GenerateRandomPointsList(5));

            // // Structurer la réponse
            var response = new ResponseData
            {
                Points = points,
                Status = false
            };


            return Ok(response);
        }

        public class ResponseData
        {
            public List<List<Point>> Points { get; set; }
            public bool Status { get; set; }
        }

        private List<Point> GenerateRandomPointsList(int count)
        {
            Random random = new Random();
            List<Point> points = new List<Point>();

            for (int i = 0; i < count; i++)
            {
                // Générer des coordonnées aléatoires entre 0 et 100 (par exemple)
                int x = random.Next(0, 100);
                int y = random.Next(0, 100);
                points.Add(new Point { X = x, Y = y });
            }

            return points;
        }

        public class PlateauData
        {
            public int[][] Plateau { get; set; }
            public Point DernierPoint { get; set; }
        }

        public class Point
        {
            public int X { get; set; }
            public int Y { get; set; }
        }
    }
}
